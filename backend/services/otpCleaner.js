import { db } from "../db/db.js";
import { lt } from "drizzle-orm";
import { otp } from "../db/schema.js";
import { subMinutes } from "date-fns";

export function startOtpCleanup() {
  setInterval(async () => {
    const fiveMinutesAgo = subMinutes(new Date(), 5);
    try {
      const result = await db
        .delete(otp)
        .where(lt(otp.createdAt, fiveMinutesAgo));

      console.log(`✅ Deleted old OTPs at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('❌ Error deleting expired OTPs:', error);
    }
  }, 60 * 1000 * 60);
}