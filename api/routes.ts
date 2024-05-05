import { TsignupSchema } from "@/types/types";

export interface IAppProps {
}

async function POST(request: Request) {
    const data: TsignupSchema = await request.json()
    const { fullname, email, password } = data

    console.log(data)
} 
