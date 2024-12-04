<template>
  <div v-if="review" class="review-container">
    <div class="review-card" @mouseover="hover = true" @mouseleave="hover = false">
      <h1 class="review-title">{{ review.title.rendered }}</h1>
      <div v-if="review.meta?.rating" class="review-item">
        <strong>Rating:</strong> {{ review.meta.rating }} / 10
      </div>
      <div v-if="review.meta?.description" class="review-item">
        <strong>Description:</strong> {{ review.meta.description }}
      </div>
      <div v-if="review.meta?.review_date" class="review-item">
        <strong>Review Date:</strong> {{ review.meta.review_date }}
      </div>
      <div v-if="review.meta?.written_by" class="review-item">
        <strong>Written By:</strong> {{ review.meta.written_by }}
      </div>
      <div v-if="review.meta?.short_summary" class="review-item">
        <strong>Short Summary:</strong> {{ review.meta.short_summary }}
      </div>
      <div v-if="review.content.rendered" class="review-content">
        <strong>Full Review:</strong>
        <div v-html="review.content.rendered"></div>
      </div>
    </div>
  </div>

  <div v-else class="loading-message">
    <p>Loading review details...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReviewDetail',
  data() {
    return {
      review: null,
      hover: false,
    };
  },
  created() {
    const reviewId = this.$route.params.id;
    this.fetchReviewDetail(reviewId);
  },
  watch: {
    '$route.params.id'(newId) {
      this.fetchReviewDetail(newId);
    },
  },
  methods: {
    fetchReviewDetail(id) {
      axios.get(`https://dev-reviewcmsproject.pantheonsite.io/wp-json/wp/v2/review/${id}`)
        .then(response => {
          this.review = response.data;
        })
        .catch(error => {
          console.error('Error fetching review details:', error);
        });
    }
  }
};
</script>

<style scoped>
.review-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.review-card {
  max-width: 900px;
  width: 100%;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

.review-card:hover {
  transform: scale(1.05);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.2);
}

h1.review-title {
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  animation: fadeIn 1s ease-out;
}

.review-item {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  animation: fadeIn 1s ease-out;
}

.review-item strong {
  color: #1abc9c;
  font-weight: 600;
}

.review-content {
  margin-top: 25px;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
}

.review-content strong {
  font-size: 1.3rem;
  color: #1abc9c;
}

.loading-message {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .review-card {
    padding: 20px;
  }

  h1.review-title {
    font-size: 2.2rem;
  }

  .review-item {
    font-size: 1.1rem;
  }

  .review-content {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .review-card {
    padding: 15px;
  }

  h1.review-title {
    font-size: 1.8rem;
  }

  .review-item {
    font-size: 1rem;
  }

  .review-content {
    font-size: 0.95rem;
  }
}
</style>
