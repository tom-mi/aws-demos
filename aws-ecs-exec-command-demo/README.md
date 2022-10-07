# aws-ecs-exec-command-demo

Deploys a single fargate container running HTTPD with 
[Amazon ECS Exec](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
enabled.

After deploying the demo to your AWS account, connect to the task via 
[AWS CLI execute-command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecs/execute-command.html),
e.g.

    ./execute-command.sh hostame
    ./execute-command.sh uptime
    ./execute-command.sh /bin/bash

The script is just a small convenience wrapper to obtain the ARN of the task and pass it to execute-command.

## Useful commands

* `npm ci`                     install dependencies
* `npm run cdk -- deploy`      deploy this stack to your default AWS account/region
* `npm run cdk -- diff`        compare deployed stack with current state
* `npm run cdk -- synth`       emits the synthesized CloudFormation template
