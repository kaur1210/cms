<template>
  <div class="home-page">
    <h1>Reviews</h1>

    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        @input="searchReviews" 
        type="text" 
        placeholder="Search..." 
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading-message">Loading reviews...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="filteredReviews.length > 0" class="review-tiles">
      <div
        v-for="review in filteredReviews"
        :key="review.id"
        class="review-tile"
        @click="goToReview(review.id)"
      >
        <h2>{{ review.title.rendered }}</h2>
      </div>
    </div>

    <div v-else class="no-results">
      <p>No reviews found for your search.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviews: [],
      filteredReviews: [],
      loading: true,
      error: null,
      searchQuery: '',
    };
  },
  methods: {
    async fetchReviews() {
      this.loading = true;
      try {
        const response = await axios.get(
          'https://dev-reviewcmsproject.pantheonsite.io/wp-json/wp/v2/review'
        );
        this.reviews = response.data.map((review) => ({
          id: review.id,
          title: review.title,
        }));
        this.filteredReviews = this.reviews;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    searchReviews() {
      if (this.searchQuery.trim() === '') {
        this.filteredReviews = [...this.reviews];
      } else {
        this.filteredReviews = this.reviews.filter((review) =>
          review.title.rendered.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    goToReview(reviewId) {
      this.$router.push(`/review/${reviewId}`);
    },
  },
  mounted() {
    this.fetchReviews();
  },
  watch: {
    searchQuery() {
      this.searchReviews();
    }
  }
};
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  animation: fadeIn 1s ease-out;
}

.search-input {
  width: 50%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #1abc9c;
  box-shadow: 0 2px 10px rgba(0, 170, 137, 0.3);
}

h1 {
  font-size: 3rem;
  color: #1abc9c;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(45deg, #ff6b6b, #1abc9c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  animation: fadeInUp 1s ease-out;
}

h1::before {
  content: 'Reviews';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(5px);
  z-index: -1;
  color: rgba(0, 0, 0, 0.2);
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.review-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.review-tile {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  width: calc(33.333% - 20px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: all 0.3s ease;
  animation: fadeIn 1s ease-out;
}

.review-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.review-tile h2 {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .review-tile {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .review-tile {
    width: 100%;
  }

  .search-input {
    width: 80%;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
