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
      options: { 
        contentTypes: ['NavMenuItem'] 
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/navMenuItems/**/*.md',
        typeName: 'NavMenuItem'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/homePg.md',
        typeName: 'HomePage'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/roots-and-youth.md',
        typeName: 'RootsAndYouth'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/the-episodes.md',
        typeName: 'TheEpisodes'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/musical-friends.md',
        typeName: 'MusicalFriends'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/friends/*.md',
        typeName: 'Friends'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/nadia-music.md',
        typeName: 'NadiaMusic'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/early-productions.md',
        typeName: 'EarlyProductions'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/discography.md',
        typeName: 'Discography'
      }
    },
  ]
}