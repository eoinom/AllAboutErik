// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  })

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api
  // })

  const slugify = require('@sindresorhus/slugify')

  // create the individual Friends pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allFriends {
        edges {
          node {
            id
            name
          }
        }
      }
    }`)

    // const slugify = require('@sindresorhus/slugify')

    data.allFriends.edges.forEach(({ node }) => {
      pageSlug = slugify(node.name)
      createPage({
        path: `/musical-journey/musical-friends/${pageSlug}`,
        component: './src/templates/Friend.vue',
        context: {
          id: node.id
        }
      })
    })
  })


  // create the individual Collections pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allCollections {
        edges {
          node {
            id
            name
          }
        }
      }
    }`)

    // const slugify = require('@sindresorhus/slugify')

    // data.allCollections.edges.forEach(({ node }) => {
    //   pageSlug = slugify(node.name)
    //   createPage({
    //     path: `/collections/${pageSlug}`,
    //     component: './src/templates/Collection.vue',
    //     context: {
    //       id: node.id
    //     }
    //   })
    // })
  })

}