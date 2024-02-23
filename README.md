Find Neighbourly deployed on Vercel: https://community-app-blush.vercel.app/
Made with love by the dream team, Adriana, Aisling, Anne, Fatima

Neighbourly is a community-based platform where users can post about services or assets they can provide locally and set their location to see relevant posts to their neighbourhood and filter/sort posts. 

Neighbourly has been styled with Tailwind. 
Neighbourly is currently only desktop only, mobile optimisation incoming! 

MVP goals:
- Allow new users to create a profile and set their location
- Show posts relevant to location
- Sort posts by popularity or recency 
- Explore other posts under the same hashtags
- View posts from other locations
- Like posts (but only once)
- Go to their profile to see own posts and edit their information
- Share your own post
- Edit posts you've shared
- Comment on posts & interact with other users
- Click on other profiles 

We achieved all of our MVP goals with the exception of commenting & interacting with other profiles. We aim to complete this on a future commit and deployment.

Future goals:
- Consistent styling across the application
- Allow users to delete posts
- Allow users to share images in their posts
- Integrate Google API so local businesses / organisations can include their services
- Allow users to create events / groups

Refer to the following doc to discover our planning docs and references: https://docs.google.com/presentation/d/1epwRu1Zg0awS34V6jkA1UVb4lAEVj69EaAYrictfgu4/edit#slide=id.g1f2a945c914_5_3

Reflections
- we could have limited scope creep 
- we could have better allocated roles in the team from the start and prioritised tasks better

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Pull to your local machine by cloning the repo. 
First, run npm install

Please refer to the planning documents to obtain the Database keys and the Clerk Authentication keys
Create an .env.local file and past these in. 

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result on your local machine. 
