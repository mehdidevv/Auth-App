<script>
  import { authenticated } from "../stores/auth";
  import { goto } from "@sapper/app.mjs";
  import { onMount } from "svelte";
  let auth = false;
  onMount(() => {
    authenticated.subscribe((a) => (auth = a));
  });
  const logout = async () => {
    authenticated.set(false);
    localStorage.removeItem("token");
    goto("/login");
  };
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">FINDEE </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon" />
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      {#if auth}
        <li class="nav-item active">
          <a class="nav-link" href="/users">
            Users <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <span id="logout" class="nav-link" on:click={logout}>Logout</span>
        </li>
      {:else}
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li>
      {/if}
    </ul>
  </div>
</nav>

<style>
  #logout {
    cursor: pointer;
  }
</style>
