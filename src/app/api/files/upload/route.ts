import { NextResponse, NextRequest } from "next/server";
import { promises as fsPromises } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data)
  const file: File | null = data.get('pdf') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    // Read the file data into a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where you want to save the file on your server
    const filePath = path.join(process.cwd(), "public",  file.name);

    // Write the buffer to the file
    await fsPromises.writeFile(filePath, buffer);

    // Optionally, you can respond with a success message
    return NextResponse.json({ success: true, filePath });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ success: false, error: "Failed to save file" }, { status: 500 });
  }
}
