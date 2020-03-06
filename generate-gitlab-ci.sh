#!/bin/sh

DEV_K8S_SITES="ondrejsika.io skolenie-ansible.sk ondrej-sika.uk sika-kaplan.com trainera.io"
PROD_K8S_SITES="ansible-utbildning.se docker-utbildning.se git-utbildning.se gitlab-utbildning.se kubernetes-utbildning.se ondrej-sika.com ondrej-sika.cz ondrej-sika.de git-training.uk docker-training.uk kubernetes-training.uk ansible-training.uk gitlab-training.uk ansible-schulung.de ansible-skoleni.cz dockerschulung.de gitlab-ci.cz kubernetes-schulung.de skoleni-docker.cz skoleni-git.cz skoleni-kubernetes.cz skolenie-git.sk skolenie-gitlab.sk skolenie-docker.sk skolenie.kubernetes.sk salzburgdevops.com skoleni-terraform.cz skoleni-proxmox.cz skoleni-prometheus.cz docker-training.de docker-training.ch docker-training.nl docker-training.at git-training.nl skoleni-rancher.cz ondrejsikalabs.com sika-kaplan.com training.kubernetes.is training.kubernetes.lu sika-kraml.de sika-training.com cal-api.sika.io ydo.cz ccc.oxs.cz sika.blog static.sika.io sikahq.com"
DEV_SUFFIX=".xsika.cz"
DEV_K8S_SUFFIX=".panda.k8s.oxs.cz"


cat << EOF > .gitlab-ci.yml
# Don't edit this file maually
# This file is generated by ./generate-gitlab-ci.yml

EOF

cat << EOF >> .gitlab-ci.yml
image: ondrejsika/ci

stages:
  - build_js
  - build_docker
  - deploy_dev
  - deploy_prod

variables:
  DOCKER_BUILDKIT: '1'

EOF

for SITE in $(cat sites.txt)
do

cat << EOF >> .gitlab-ci.yml
$SITE build js:
  stage: build_js
  image: node
  variables:
    GIT_CLEAN_FLAGS: none
  script:
    - yarn
    - rm -rf packages/$SITE/out
    - yarn run static-$SITE
  except:
    variables:
      - \$EXCEPT_BUILD
      - \$EXCEPT_BUILD_JS
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/$SITE/**/*
      - yarn.lock
  artifacts:
    name: $SITE
    paths:
      - packages/$SITE/out


$SITE build docker:
  dependencies:
    - $SITE build js
  variables:
    GIT_STRATEGY: none
  stage: build_docker
  script:
    - docker login \$CI_REGISTRY -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD
    - cp ci/docker/* packages/$SITE/
    - docker build -t registry.sikahq.com/www/www/$SITE:\$CI_COMMIT_SHORT_SHA packages/$SITE
    - rm packages/$SITE/Dockerfile
    - rm packages/$SITE/nginx-site.conf
    - docker push registry.sikahq.com/www/www/$SITE:\$CI_COMMIT_SHORT_SHA
  except:
    variables:
      - \$EXCEPT_BUILD
      - \$EXCEPT_BUILD_DOCKER
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/$SITE/**/*
      - yarn.lock

EOF

if printf '%s\n' ${DEV_K8S_SITES[@]} | grep "$SITE" > /dev/null; then
SUFFIX=$DEV_K8S_SUFFIX
NAME=$(echo $SITE | sed "s/\./-/g")
cat << EOF >> .gitlab-ci.yml
$SITE dev deploy k8s:
  stage: deploy_dev
  variables:
    GIT_STRATEGY: none
    KUBECONFIG: .kubeconfig
  script:
    - echo \$KUBECONFIG_FILECONTENT | base64 --decode > .kubeconfig
    - helm repo add ondrejsika https://helm.oxs.cz
    - helm upgrade --install $NAME-dev ondrejsika/one-image --set host=$SITE$SUFFIX --set image=\$CI_REGISTRY_IMAGE/$SITE:\$CI_COMMIT_SHORT_SHA --set changeCause=job-\$CI_JOB_ID
    - kubectl rollout status deploy $NAME-dev
  except:
    - master
  except:
    variables:
      - \$EXCEPT_DEPLOY
      - \$EXCEPT_DEPLOY_K8S
      - \$EXCEPT_DEPLOY_DEV
      - \$EXCEPT_DEPLOY_DEV_K8S
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/$SITE/**/*
      - yarn.lock
  environment:
    name: dev $SITE
    url: https://$SITE$SUFFIX
  dependencies: []

EOF
fi;

if printf '%s\n' ${PROD_K8S_SITES[@]} | grep "$SITE" > /dev/null; then
SUFFIX=$DEV_K8S_SUFFIX
NAME=$(echo $SITE | sed "s/\./-/g")
cat << EOF >> .gitlab-ci.yml
$SITE prod deploy k8s:
  stage: deploy_prod
  variables:
    GIT_STRATEGY: none
    KUBECONFIG: .kubeconfig
  script:
    - echo \$KUBECONFIG_FILECONTENT | base64 --decode > .kubeconfig
    - helm repo add ondrejsika https://helm.oxs.cz
    - helm upgrade --install $NAME ondrejsika/one-image --set host=$SITE --set image=\$CI_REGISTRY_IMAGE/$SITE:\$CI_COMMIT_SHORT_SHA --set changeCause=job-\$CI_JOB_ID
    - kubectl rollout status deploy $NAME
  except:
    variables:
      - \$EXCEPT_DEPLOY
      - \$EXCEPT_DEPLOY_K8S
      - \$EXCEPT_DEPLOY_PROD
      - \$EXCEPT_DEPLOY_PROD_K8S
  only:
    refs:
      - master
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/$SITE/**/*
      - yarn.lock
  environment:
    name: prod $SITE
    url: https://$SITE
  dependencies: []

EOF
fi;

done
