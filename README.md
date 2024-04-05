### Stripe subscription with SvelteKit

This is a demo showing how to intergrate subscriptions with SvelteKit and Stripe. You can find a full write up [here](https://www.thespatula.io/projects/sveltekit-stripe-demo/demo/), while below you'll find the how to get the demo up and running.

![Demo](./demo.png)

### Running

To run this application you'll need to first clone the repo:

```bash
git clone https://github.com/kilroyjones/sveltekit-stripe-demo
```

Then cd into the folder and install the libraries:

```bash
cd sveltekit-stripe-demo
npm i
```

Next, change the **template.env** to **.env** and add your public and private Stripe test keys:

```bash
PUBLIC_STRIPE=
PRIVATE_STRIPE=
PUBLIC_DOMAIN=http://localhost:5173

```

You can leave the domain unless you plan on running elsewhere.

After that you should be good to go:

```bash
npm run dev
```

Navigate to **http://localhost:5173** and you should be presented with a _subscribe_ button.
