export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '603fb88bc877c17b0143e1db',
                  title: 'Sanity Studio',
                  name: 'next-sanity-bracket-notation-issue-studio',
                  apiId: 'efdd20b6-08cc-441a-82de-0af5fc3e2152'
                },
                {
                  buildHookId: '603fb88bce1ae3728112df12',
                  title: 'Landing pages Website',
                  name: 'next-sanity-bracket-notation-issue',
                  apiId: 'f7d7cb1f-958c-4fad-8c5e-bd1a42bd4989'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/fmenkes/next-sanity-bracket-notation-issue',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://next-sanity-bracket-notation-issue.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
