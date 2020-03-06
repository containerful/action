import { strict as assert } from 'assert'
import {deploy} from '../src/deploy'

it('deploys', async () => {
    await deploy({
        dockerComposePath: 'example-dc.yml',
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
    })
})