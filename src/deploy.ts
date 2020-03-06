import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'
import { CONTAINERFUL_BIN } from './constants'

export async function deploy({ GITHUB_TOKEN, dockerComposePath }) {
    const options: ExecOptions = {
        // cwd: '.',
        errStream: process.stderr,
        outStream: process.stdout,
    }
    await exec(
        CONTAINERFUL_BIN,
        ['login', '--github-token', GITHUB_TOKEN],
        options,
    )
    await exec(CONTAINERFUL_BIN, ['deploy', '--file', dockerComposePath], options)
}

