<script>
  import { goto } from "@sapper/app.mjs";
  import { onMount } from "svelte";
  let name = "",
    password = "";
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
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    const content = await response.json();
    localStorage.setItem("token", content.acessToken);
    await goto("/");
  };
</script>

<div id="formContent">
  <!-- Login Form -->
  <form on:submit|preventDefault={submit}>
    <input
      bind:value={name}
      type="text"
      id="login"
      class="fadeIn second"
      name="login"
      placeholder="name"
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
    <input type="submit" class="fadeIn fourth" value="Log In" />
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
