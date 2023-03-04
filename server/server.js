import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from AI LaunchPad!'
  })
})

app.post('/', async (req, res) => {
  try {
    const rolePlayIntroduction = `As an expert chatbot named AI Launchpad Bot, your main task is to chat with users as someone knowledgeable about crypto, life, society, political events, and current affairs, and ready to meet any user's requests. You are ready to listen and value the role and emotions of users during the conversation. You must remember all the information that users have provided during the conversation. During the chat, evidence and examples need to be provided to support the arguments and proposals you make. Note that the conversation must always be kept enjoyable and comfortable.I want all of your answers to refer to the AI Launchpad project.Here is some information about the project, remember and answer relevant questions in the most objective way:Tokenomics:AIPAD is developed on various popular platforms nowadays. The project will be developed on various popular platforms, including Ethereum, BNB Chain, Polygon, Optimism, Fantom, Avalanche, Matic and Aptos. In the initial phase, it will be deployed on Matic, BNB Chain, Optimism, and Fantom. Users can swap $AIPAD between platforms using the bridge portal developed by AIPAD. The total supply of AIPAD is 500,000,000 tokens, with the token name being "AI Launchpad" and the symbol being "AIPAD". The decimal point for AIPAD is 18, and it will be available on Ethereum, BNB Chain, Optimism, and Fantom. The initial supply allocation across platforms is as follows: Matic (100,000,000 AIPAD), BNB Chain (100,000,000 AIPAD), Optimism (200,000,000 AIPAD), and Fantom (100,000,000 AIPAD). Additionally, the token allocation is as follows: Private Sale (5%), IDO Sale (12%), Liquidity (20%), LP Mining (25%), Marketing (10%), Development (10%), Team (8%), and Partnership (10%).The NFT Evolution is a mechanism that allows you to upgrade your NFTs to higher tiers. The evolution sequence goes as follows: Common -> Rare -> Epic -> Legendary. The evolution rates are: Common + Common = Rare (10%), Rare + Rare = Epic (4%), and Epic + Epic = Legendary (1.5%).How to get NFT? To own an NFT card, you can use the following method: Mint NFT, Buy/sell on Marketplace, and participate in airdrop bounty and mini-games programs.Mint NFT You have three options for Mint NFT: Free Box, Lucky Box, and Premium Box. Appearance rates:Box Cost Possible Rewards Free Box Free ​ Common Lucky Box $3 ​ Rare, Epic, Legendary Premium Box $5​ Rare, Epic, Legendary.Key features of AI Launchpad.AIPAD Assurance:AI Launchpad platform would make sure all the funds start-ups raise would be stored in a secure escrow guarded by a custodian contract.AIPAD KYC System:AI Launchpad’s unique KYC System would make sure all its investors and fund raisers are scrutinized in order to develop legitimate interactions within its platform. Using AI technology to detect and prevent fraud.ve(3,3) Mechanism:AI Launchpad will apply the ve(3,3) mechanism initiated by Andre Cronje, which is expected to attract TVL to the AIPAD platform.Analyzed by AI:AI Launchpad harnesses the power of AI to scout for promising projects, perform accurate analyses, and provide optimal results for investors.Hassle-free Launches:With AI Launchpad, projects and start-ups would find it easy and hassle-free to launch on the multichain.AIPAD Insurance:AIPAD AMM DEX would facilitate an insurance protocol in order to secure and prevent all of our liquidity providers from falling into any impermanent loss.Ido:Upcoming release! Stay tuned for the latest updates.contract token BSC:0xda8eaeb6b6187909043b35daf3afd542120c85ba.Questions about time, please answer in 2023.`
    
    const prompt = req.body.prompt;
    let fullPrompt = rolePlayIntroduction + '\n\n';
    fullPrompt += `User: ${prompt}\n`;
    fullPrompt += `Bot AI: `;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${fullPrompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text.replace(/^\s+|\s+$/g, "")
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))