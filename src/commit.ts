import { exec } from '@actions/exec'
import * as core from '@actions/core'
import { ExecOptions } from '@actions/exec/lib/interfaces'

export const commit = async ({ USER_NAME, USER_EMAIL, MESSAGE, GITHUB_TOKEN }) => {
    try {
        if (!GITHUB_TOKEN) {
            console.log('missing required env vars, skipping commit creation')
            core.setFailed('missing required env vars')
            return
        }
        console.log(`committing changes with message "${MESSAGE}"`)
        const REMOTE_REPO = `https://${process.env.GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`

        const options = {
            cwd: process.env.GITHUB_WORKSPACE,
            listeners: {
                stdline: core.debug,
                stderr: core.error,
                debug: core.debug,
            },
        } as any

        await exec('git', ['config', 'user.name', `"${USER_NAME}"`], options)
        await exec('git', ['config', 'user.email', `"${USER_EMAIL}"`], options)

        await exec('git', ['remote', 'add', 'publisher', REMOTE_REPO], options)
        await exec('git', ['show-ref'], options)
        await exec('git', ['branch', '--verbose'], options)

        await exec('git', ['add', '-A'], options)

        try {
            await exec('git', ['commit', '-m', `${MESSAGE}`], options)
        } catch (err) {
            core.debug('nothing to commit, working tree clean')
            return
        }
        const ref = process.env.GITHUB_REF || 'master'
        const branch = ref.split('/').reverse()[0]
        await exec('git', ['branch', 'tmp'], options)
        await exec('git', ['checkout', branch], options)
        await exec('git', ['merge', 'tmp'], options)
        await exec('git', ['push', 'publisher', branch], options)
    } catch (err) {
        core.setFailed(err.message)
        console.log(err)
    }
}
