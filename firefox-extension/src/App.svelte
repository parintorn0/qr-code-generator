<script>
  import QRCode from "easyqrcodejs";
  import { onMount } from "svelte";
  let canvas;
  let currentUrl=document.URL;
  let qr;
  onMount(() => {
    const options = {
      text: currentUrl,
      width: 150,
      height: 150,
      quietZone: 5,
      logo: "logo.png",
      logoWidth: 40,
      logoHeight: 40,
    };
    qr=new QRCode(canvas, options);
  });
    $:{
      if(qr) qr.makeCode(currentUrl)
    }
  let showCurrentUrl=true;

  function ChangeQR(custom){
    if(custom){
      showCurrentUrl=false
    }
    else{
      currentUrl=document.URL;
      showCurrentUrl=true
    }
  }
</script>

<main>
  <div id="card">
    <center>
      <div id="qrcode" bind:this={canvas}></div>
      <div>
        {currentUrl}
      </div>
      <div class={showCurrentUrl?"last-child":""}>
        <button on:click={()=>ChangeQR(false)} class={showCurrentUrl?"active":""}>Current URL</button>
        <button on:click={()=>ChangeQR(true)} class={!showCurrentUrl?"active":""}>Custom URL</button>
      </div>
      {#if !showCurrentUrl}
        <div class="last-child">
          <input bind:value={currentUrl} type="url">
        </div>
      {/if}
    </center>
  </div>
</main>

<style>
  main {
    background-color: var(--color-surface-100);
    height: 100%;
    padding: 15px;
  }
  main #card{
    border-radius: 15px;
    height: 300px;
    background-color: var(--color-surface-200);
    padding-top: 30px;
  }
  button{
    width: 70px;
    height: 40px;
    background: none;
    border-radius: 10px;
    border: none;
    color: var(--color-primary-400);
  }
  button.active{
    color: var(--color-surface-100);
    background: var(--color-primary-500);
  }
  button:not(.active):hover{
    background: var(--color-primary-500);
    filter: brightness(0.4);
    color: var(--color-surface-100);
  }
  div:not(#qrcode){
    margin-bottom: 10px;
  }
  div.last-child{
    margin-bottom: 0;
  }
  input{
    background-color: var(--color-surface-300);
    border-radius: 15px;
    padding: 10px;
    color: #fff;
    border: none;
  }
</style>