<script>
  import { goto } from "@sapper/app.mjs";
  import { onMount } from "svelte";
  import UserCard from "../components/UserCard.svelte";
  let users = [];
  onMount(async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/isAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const content = await response.json();
    if (!content.isAuth) await goto("/login");

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      users = await response.json();
      console.log(users);
    } catch (e) {
      console.log(e);
    }
  });
</script>

<h1>Liste des utilisateurs :</h1>
<div class="container mt-5">
  <div class="row">
    {#each users as user}
      <UserCard name={user.name} email={user.email} />
    {/each}
  </div>
</div>
