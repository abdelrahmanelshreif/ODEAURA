import axiosClient from './axiosClient'

const reviewApi = {
  getAllReviews: () => axiosClient.get('reviews'),
  getProdReviews: (id) => axiosClient.get(`reviews/product=${id}`),
  addReview: (params) => axiosClient.post('reviews', params),
  deleteReview: (id) => axiosClient.delete(`reviews/delete/${id}`),
}
export default reviewApi