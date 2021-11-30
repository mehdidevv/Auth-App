<script>
  import { goto } from "@sapper/app.mjs";
  import { onMount } from "svelte";
  let name = "",
    email = "",
    password = "",
    errors = [];
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
    if (content.isAuth) await goto("/");
  });
  const submit = async () => {
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const content = await response.json();
    if ((await content.errors.length) > 0) errors = await content.errors;
    else await goto("/login");
  };
</script>

{#each errors as error}
  <div class="alert alert-danger" style="width: 60%;" role="alert">
    {error}
  </div>
{/each}
<div id="formContent">
  <!-- Register Form -->
  <form on:submit|preventDefault={submit}>
    <input
      bind:value={email}
      type="text"
      id="login"
      class="fadeIn second"
      name="login"
      placeholder="Email"
      required
    />
    <input
      bind:value={name}
      type="text"
      id="login"
      class="fadeIn second"
      name="login"
      placeholder="login"
      required
    />
    <input
      bind:value={password}
      type="text"
      id="password"
      class="fadeIn third"
      name="login"
      placeholder="password"
      required
    />
    <input type="submit" class="fadeIn fourth" value="Register" />
  </form>
</div>

<style>
  #formContent {
    padding-top: 50px;
  }
  #password {
    -webkit-text-security: disc;
  }
</style>
