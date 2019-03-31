Notes

Using volumes instead of local paths because Windows+MongoDB+Local paths apparently do not mix.
Using Cookies + JWTs because HttpOnly cookies are 'mostly' immune from XSS attacks and we can build the app with the 'invisibility' in mind

Steps:

1) docker-compose up
2) import test data via: docker-compose exec api npm run-script import-names
3) Browse http://localhost:3000 for a Swagger UI

Commit history

I accidentally started this as a local repo. You can find the commit history for the local repo in COMMIT_HISTORY.txt