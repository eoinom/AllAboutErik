// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
            title
          }
        }
      }
    }`)
    data.allCollections.edges.forEach(({ node }) => {
      pageSlug = slugify(node.title)
      if (pageSlug === 'old-time-sportsmen')
        return;
      createPage({
        path: `/collections/${pageSlug}`,
        component: './src/templates/Collection.vue',
        context: {
          id: node.id
        }
      })
    })
  })


  // create the individual Publications pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allPublications {
        edges {
          node {
            id
            title
          }
        }
      }
    }`)
    data.allPublications.edges.forEach(({ node }) => {
      pageSlug = slugify(node.title)
      createPage({
        path: `/publications/${pageSlug}`,
        component: './src/templates/Publication.vue',
        context: {
          id: node.id
        }
      })
    })
  })


  // create the individual Archives pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allArchives {
        edges {
          node {
            id
            title
          }
        }
      }
    }`)
    data.allArchives.edges.forEach(({ node }) => {
      pageSlug = slugify(node.title, {customReplacements: [['\'', '']]})
      createPage({
        path: `/archives/${pageSlug}`,
        component: './src/templates/Archive.vue',
        context: {
          id: node.id
        }
      })
    })
  })

  // create the individual Narrative Archive pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allArchivesNarrative {
        edges {
          node {
            id
            title
          }
        }
      }
    }`)
    data.allArchivesNarrative.edges.forEach(({ node }) => {
      pageSlug = slugify(node.title, {customReplacements: [['\'', '']]})
      createPage({
        path: `/archives/${pageSlug}`,
        component: './src/templates/ArchiveNarrative.vue',
        context: {
          id: node.id
        }
      })
    })
  })

  // create the individual Narrative Archive Gallery pages
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allArchivesNarrativeGallery {
        edges {
          node {
            id
            title
          }
        }
      }
    }`)
    data.allArchivesNarrativeGallery.edges.forEach(({ node }) => {
      pageSlug = slugify(node.title, {customReplacements: [['\'', '']]})
      createPage({
        path: `/archives/${pageSlug}-gallery`,
        component: './src/templates/ArchiveNarrativeGallery.vue',
        context: {
          id: node.id
        }
      })
    })
  })

  // configure webpack to use bundle analyzer plugin (ref: https://medium.com/js-dojo/how-to-reduce-your-vue-js-bundle-size-with-webpack-3145bf5019b7)
  // reduce bundle size ref: https://www.codegram.com/blog/improving-a-gridsome-website-performance/
  // (api.chainWebpack ref: https://gridsome.org/docs/server-api/#apichainwebpackfn)
  // ref: https://github.com/webpack-contrib/webpack-bundle-analyzer/blob/master/README.md
  api.chainWebpack(config => {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static', openAnalyzer: false }])
  })
}