const uri = process.env.MONGODB_URI?.trim() || "";

if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid MongoDB URI in production",
      uriExists: Boolean(uri),
      uriPrefix: uri.substring(0, 25),
      uriLength: uri.length,
    },
    { status: 500 }
  );
}
