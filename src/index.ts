import core from '@actions/core'
import { exec } from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'
import { CONTAINERFUL_BIN } from './constants'

async function deploy() {
    const options: ExecOptions = {
        // cwd: '.',
        errStream: process.stderr,
        outStream: process.stdout,
    }
    const dockerComposePath = core.getInput('docker_compose_path')
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN', { required: true })
    await exec(CONTAINERFUL_BIN, ['login', '--github-token', GITHUB_TOKEN], options)
    await exec(CONTAINERFUL_BIN, ['deploy', '-f', dockerComposePath], options)
}



deploy()