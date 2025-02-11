import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wwnyngoadbgaggbfwqtl.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bnluZ29hZGJnYWdnYmZ3cXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTQ2NTQsImV4cCI6MjA1MzU3MDY1NH0.xUNqPSz9YMLkK45zl1xLINzdlAc_U_anEpP54MQJK28";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
