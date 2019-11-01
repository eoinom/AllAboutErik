// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'All About Erik',
  titleTemplate: `%s | All About Erik`,
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/posts/**/*.md',
        typeName: 'Post',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms-paths',
      options: { contentTypes: ['NavMenuItem'] }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/navMenu/**/*.md',
        typeName: 'NavMenuItem'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/homePg/**/*.md',
        typeName: 'HomePage'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/roots&youth/**/*.md',
        typeName: 'RootsAndYouth'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/musical-journey/the-episodes.md',
        typeName: 'TheEpisodes'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/musical-journey/musical-friends.md',
        typeName: 'MusicalFriends'
      }
    }
  ]
}