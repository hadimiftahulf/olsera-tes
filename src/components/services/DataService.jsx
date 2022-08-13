import axios from 'axios'

export default {
  getList: async function (page) {
    try {
      let url
      if ((page != null) & (page > 1)) {
        url =
          'https://jsonplaceholder.typicode.com/posts?_page=' +
          page +
          '&_limit=5'
      } else {
        url = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5'
      }
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getListDetail: async function (id) {
    try {
      let url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
