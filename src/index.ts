import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'
import { CONTAINERFUL_BIN } from './constants'
import { deploy } from './deploy'
import { commit } from './commit'

async function main() {
    try {
        const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN', { required: true })
        await deploy({
            dockerComposePath: core.getInput('docker_compose_path'),
            GITHUB_TOKEN,
        })

        await commit({
            GITHUB_TOKEN,
            MESSAGE: 'containerful deployment',
            USER_EMAIL: 'action@containerful.xyz',
            USER_NAME: 'containerful',
        })
    } catch (e) {
        core.setFailed('deployment failed: ' + e?.message)
        return
    }
}

main()
