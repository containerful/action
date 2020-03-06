import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'
import { CONTAINERFUL_BIN } from './constants'
import { deploy } from './deploy'

deploy({
    dockerComposePath: core.getInput('docker_compose_path'),
    GITHUB_TOKEN: core.getInput('GITHUB_TOKEN', { required: true }),
})
