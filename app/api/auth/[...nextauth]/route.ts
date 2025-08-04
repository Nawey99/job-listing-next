import NextAuth, { AuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Credentials {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  role?: string;
  isSignup?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        confirmPassword: { label: "Confirm Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        if (!credentials) {
          console.error("No credentials provided");
          throw new Error(JSON.stringify({ error: "No credentials provided" }));
        }

        const isSignup = credentials.isSignup === "true";

        if (isSignup) {
          const { name, email, password, confirmPassword, role } = credentials;
          if (!name || !email || !password || !confirmPassword || !role) {
            console.error("Missing signup fields:", { name, email, password, confirmPassword, role });
            throw new Error(JSON.stringify({ error: "Missing required fields for signup" }));
          }
          if (password !== confirmPassword) {
            console.error("Password mismatch");
            throw new Error(JSON.stringify({ error: "Passwords do not match" }));
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password, confirmPassword, role: role.toUpperCase() }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
              data = await response.json();
            } else {
              data = { error: await response.text() };
            }

            if (!response.ok) {
              console.error("Signup API error:", data);
              throw new Error(JSON.stringify({ error: data.message || data.error || "Signup failed" }));
            }

            console.log("Signup API success:", data);
            return { id: email, email, name, role };
          } catch (error) {
            console.error("Signup fetch error:", error);
            throw error instanceof Error ? error : new Error(JSON.stringify({ error: "Signup failed" }));
          }
        } else {
          const { email, password } = credentials;
          if (!email || !password) {
            console.error("Missing login fields:", { email, password });
            throw new Error(JSON.stringify({ error: "Missing email or password" }));
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
              data = await response.json();
            } else {
              data = { error: await response.text() };
            }

            if (!response.ok) {
              console.error("Login API error:", data);
              throw new Error(JSON.stringify({ error: data.message || data.error || "Login failed" }));
            }

            console.log("Login API success:", data);
            return {
              id: email,
              email,
              accessToken: data.data.accessToken,
            };
          } catch (error) {
            console.error("Login fetch error:", error);
            throw error instanceof Error ? error : new Error(JSON.stringify({ error: "Login failed" }));
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-email",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
