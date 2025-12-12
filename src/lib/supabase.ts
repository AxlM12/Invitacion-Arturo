import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ntveyyyqclhhhqngflgh.supabase.co'
const supabaseAnonKey = 'sb_publishable_Pn3o0BFtYCIE82sO19tiBQ_ZPytKc0r'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)