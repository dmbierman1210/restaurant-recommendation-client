# Roadmap for Restaurant Recommendation Client

## Project Overview
A monolithic web application with a modern UI for recommending restaurants using Gemini or another LLM, integrating Google search, and learning from user feedback (ratings, comments, visit history). The app will:
- Recommend restaurants based on user preferences and feedback
- Allow users to log visits, rate, and comment on restaurants
- Track places to revisit and new recommendations

## Milestones

### 1. Project Setup
- [ ] Initialize repository and project structure
- [ ] Set up frontend (React or similar)
- [ ] Set up backend (Node.js/Express or similar)
- [ ] Integrate Gemini or LLM API
- [ ] Set up persistent storage (database)

### 2. Core Features
- [ ] User authentication (if needed)
- [ ] Restaurant search and recommendation
- [ ] Logging visits (date, time, location)
- [ ] Rating system (1-5 stars)
- [ ] Commenting on restaurants
- [ ] Feedback loop for recommendations

### 3. UI/UX
- [ ] Modern, attractive UI
- [ ] Section for places to revisit
- [ ] Section for new recommendations
- [ ] Restaurant detail pages
- [ ] Forms for rating and comments

### 4. Advanced Features
- [ ] Google search integration for restaurant data
- [ ] Personalized recommendation logic
- [ ] Analytics/dashboard for user history

### 5. Testing & Deployment
- [ ] Unit and integration tests
- [ ] Deployment scripts/configuration
- [ ] Documentation and user guide

---

## Questions for the User
1. What frontend framework do you prefer (React, Vue, Angular, etc.)?
    A: I know Angular the best, but I would like to use this to help learn a new framework, so react might be the way to go
2. What backend stack do you prefer (Node.js, Python, etc.)?
    A: Python is perferable, assuming it will be the fastest and most efficient
3. Should user authentication be required, or is this a single-user app?
    A: For now this will be a single user, non deployed app. We may need to have some kind of login eventually so leave the space to add authentication in the future
4. Do you want to support multiple users/accounts?
    A: See (3)
5. Do you have a preferred database (PostgreSQL, MongoDB, etc.)?
    A: I don't know databases well, so easiest to learn will be best. Outside of a true database, I'd be alright just using a csv/txt file in the app. Any DB we use should boot and shutdown with the application, so we will need to find somewhere to store the data in non-volitile memory
6. Should the app support mobile devices/responsive design?
    A: Currently only on pc
7. Do you want to use Gemini specifically, or is OpenAI/other LLMs acceptable?
    A: Gemini is perferable considering it's close connection with google, but I'm alright using whatever is free to use and doesn't use a lot of local memory
8. Will the LLM need to access live Google search results, or is static data sufficient?
    A: Yes, access to live google search results will be needed so that it can report on new resturants and such
9. Should the app support location-based recommendations (using geolocation)?
    A: Yes, that would be ideal. It can either use true geolocation collecteed through the browser (perferred) or ask the user to input an address
10. Any specific design/theme preferences for the UI?
    A: Something simple and clean but still impressive and nice to look at
11. Should users be able to edit/delete their ratings/comments?
    A: Yes! And the 'current star rating' should be the average of all the previous star ratings. To save memory, only the most recent set of collected data for each resturant should be remembered
12. Any privacy or data retention requirements?
    A: Since this is local only and won't be collecting any PII, we should be fine. 
13. Should there be an admin panel for managing restaurants or user data?
    A: Yes, but currently leave it accessable via just a button (admin mode), we can impliment a login later
14. Any integrations with other services (Google Maps, Yelp, etc.)?
    A: Anything and everything we can access for free
15. What is your target timeline for an MVP?
    A: There is little rush on this, this is a personal project

Please answer these questions to help guide development and ensure the application meets your needs.

## Additional Questions
16. Would you prefer a locally running LLM (for privacy, but higher resource usage) or a cloud-based LLM API (lower local resource usage, but requires internet and may have usage limits)?

17. Are there any specific LLMs or APIs you want to avoid (e.g., due to cost, privacy, or company policies)?
18. Should the app support exporting/importing your restaurant data (for backup or migration)?
19. Would you like notifications/reminders for revisiting favorite restaurants?
20. Should the app support dark mode or other accessibility features?
21. Are there any features you want to explicitly exclude from the MVP?
22. Would you like to see analytics on your dining habits (e.g., most visited cuisine, average rating over time)?
23. Should the app support multi-language UI in the future?

OTHER NOTES:
- The appilcation should also consider allergies/severity. While have full menu access would be great to compare allergens against, it is not required as we can just compare against how likely a resturant is to have specific ingredients in its food based on style of food and historical data