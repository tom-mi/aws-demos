#!/bin/bash

set -eux

CLUSTER=ecs-exec-command-demo
TASK_ARN=$(aws ecs list-tasks --cluster $CLUSTER --query taskArns[0] --out text)

aws ecs execute-command --cluster $CLUSTER --task "$TASK_ARN" --interactive --command "$@"
