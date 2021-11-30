<script>
  import { authenticated } from "../stores/auth";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app.mjs";

  let message = "",
    auth = false;
  onMount(async () => {
    const token = localStorage.getItem("token");
    auth =
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== "undefined";
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const content = await response.json();
      authenticated.set(true);
      message = `Hi ${content.name}`;
    } catch (e) {
      message = "You are not logged in";
      authenticated.set(false);
    }
  });
  function seeUsers() {
    goto("/users");
  }
</script>

{message}
{#if auth}
  <button
    class="btn btn-outline-info mt-4"
    style="width: 220px;"
    on:click={seeUsers}
  >
    See users
  </button>
{/if}
