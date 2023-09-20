# R Squared 

Research Reader (R Squared) is a work in progress project to built a platform for seamless integration of annotation and discussion of Arxiv research papers. The platform will be built with a combination of Next.js, Supabase, and AWS technologies to take advantange of a microservice architecture. 

# Current Progress 
- Ability to comment and discuss 
- Ability to follow tags and other users 
- Basic UI and layout established

# Next steps 
- Build back-end AWS Lambdas 
- Add more tools for annotation and discussion, such as specific references to lines and phrases 

# Planned Architecture

![architecture drawio](https://github.com/hlee131/r-squared/assets/59949027/91cae3b8-441e-4efe-8d5f-a19dfaae7b18)

### The Lambdas 
1. Arxiv Scraper               
   This Lambda is run every day and scrapes the Arxiv page for new papers. The daily trigger is done by `pg-cron`. The details of these papers are pushed to the AWS Simple Queue Service for the respective consumers (AI Summary and Latex to HTML) to process.
   In the future, it might also be possible for users to upload their own `.tex` files for processing, which this Lambda will handle. 
2. AI Summary                   
   This Lambda is run for each paper once to generate a single sentence summary of the research papers using Google's `pegasus-xsum` model on HuggingFace.
3. Avatar Generator                       
   This Lambda is run whenever a new user is created and generates a default profile picture and uploads the picture to Supabase's buckets.
4. Latex to HTML                          
   This Lambda converts `.tex` source files from Arxiv to browser friendly HTML, making it easier to annotate and reference. This Lambda has to be run from a Docker image because it uses the `latexml` binary, which has its own dependencies. 
