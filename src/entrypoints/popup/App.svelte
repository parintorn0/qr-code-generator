<script>
  import QRCode from "easyqrcodejs";
  import { onMount } from "svelte";
  import { browser } from "wxt/browser";

  let textValue=$state("None");
  let qrcode=$state();
  let currentTabUrl = $state("None")

  onMount(async () => {
    const currentTab = await browser.tabs.query({active: true, lastFocusedWindow: true});
    currentTabUrl = currentTab[0].url;
    textValue = currentTabUrl
    const options = {
      text: textValue,
      width: 150,
      height: 150,
      quietZone: 5,
      logo: "/logo.png",
      colorDark : "#000000",
      colorLight : "#ffffff",
    };
    qrcode=new QRCode(node, options);
  });
  let node;
  
  let showCurrentUrl=$state(true);

  const changeQR = (custom) => {
    if(custom){
      textValue=currentTabUrl
      showCurrentUrl=false
    }
    else{
      textValue=currentTabUrl
      showCurrentUrl=true
    }
  }
  $effect(()=>{
    if(qrcode)
      qrcode.makeCode(textValue)
  })
</script>

<main>
  <div id="card">
    <center>
      <div bind:this={node}></div>
      <div id='current-url'>
          {textValue}
      </div>
      <div class="input">
        <center>
          <button onclick={()=>changeQR(false)} class={showCurrentUrl?"active":""}>
            Current URL
          </button>
          <button onclick={()=>changeQR(true)} class={!showCurrentUrl?"active":""}>
            Custom Text
          </button>
        </center>
        {#if !showCurrentUrl}
          <center>
            <input bind:value={textValue} type="url">
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
    border-radius: 15px;
  }
  #card{
    border-radius: 15px;
    height: calc(100% - 30px);
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
    font-size: 13px;
    font-weight: bold;
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