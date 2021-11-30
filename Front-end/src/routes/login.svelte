<script>
  import { goto } from "@sapper/app.mjs";
  let name = "",
    password = "";

  const submit = async () => {
    if (localStorage.getItem("token") === null) {
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
    } else {
      goto("/");
    }
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
