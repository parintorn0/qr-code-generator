<script>
  import QRCode from "easyqrcodejs";
  import { onMount } from "svelte";
  import browser from "webextension-polyfill"
  let canvas;
  let currentTabUrl;
  let currentUrl="";
  let url='';
  let qr;
  onMount(async () => {
    currentTabUrl=await browser.tabs.query({active: true, lastFocusedWindow: true});
    currentTabUrl=currentTabUrl[0].url;
    currentUrl=currentTabUrl
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
      if(currentUrl.length>25)
        url=currentUrl.substring(0,25);
      else
      url=currentUrl;
    }
  let showCurrentUrl=true;

  function ChangeQR(custom){
    if(custom){
      currentUrl="";
      showCurrentUrl=false
    }
    else{
      {
        currentUrl=currentTabUrl;
        showCurrentUrl=true
      }
    }
  }
</script>

<main>
  <div id="card">
    <center>
      <div id="qrcode" bind:this={canvas}></div>
      <div id='current-url'>
        <div>{#if currentUrl!=""}{url}{:else}...{/if}</div>
        {#if currentUrl.length>25}
        <div>.....</div>
        {/if}
      </div>
      <div class="input">
        <center>
          <button on:click={()=>ChangeQR(false)} class={showCurrentUrl?"active":""}>Current URL</button>
          <button on:click={()=>ChangeQR(true)} class={!showCurrentUrl?"active":""}>Custom Text</button>
        </center>
        {#if !showCurrentUrl}
          <center>
            <input bind:value={currentUrl} type="url">
          </center>
        {/if}
      </div>
    </center>
  </div>
</main>

<style>
  main {
    background-color: var(--color-surface-100);
    width: 250px;
    height: 400px;
    padding: 15px;
  }
  main #card{
    border-radius: 15px;
    height: 360px;
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
  #current-url{
    margin-top: 10px;
    width: 200px;
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
  #current-url div{
    margin: 0;
  }
  input{
    background-color: var(--color-surface-300);
    border-radius: 15px;
    padding: 10px;
    color: #fff;
    border: none;
  }
  .input{
    position: fixed;
    width: 250px;
    top: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>