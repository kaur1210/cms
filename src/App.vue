<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">Movies</div>
      <router-link to="/" class="home-link">Home</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(135deg, #3b52a7, #4e63b5);
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
  margin: 20px 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.home-link {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.home-link:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  .home-link {
    margin-top: 10px;
  }
}
</style>
