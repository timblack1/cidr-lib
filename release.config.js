module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // This plugin will update the CHANGELOG.md file
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        // This will only update the package.json version, not publish
        npmPublish: false,
      },
    ],
    // This plugin will publish the package to npm using OIDC
    ['@semantic-release/exec', { publishCmd: 'npm publish' }],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
}
