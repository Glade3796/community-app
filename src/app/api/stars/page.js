export async function GET() {

        try {
          const response = await db.query(
            `SELECT * FROM star WHERE user_id = (SELECT id FROM users WHERE clerk_auth_id = $1)`,
            
            [clerk_auth_id]
          );
          return response.rows;
        } catch (error) {
          console.error("Error fetching starred posts:", error);
        }
      }