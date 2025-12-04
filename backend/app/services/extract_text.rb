class ExtractText
  def initialize(attached_file)
    @file = attached_file
  end

  def call
    case content_type
    when "application/pdf"
      extract_pdf
    when "text/plain"
      download.force_encoding("UTF-8")
    else
      # fallback: try UTF-8, best effort
      download.force_encoding("UTF-8")
    end
  end

  private

  def download
    @download ||= @file.download
  end

  def content_type
    @file.content_type
  end

  def extract_pdf
    io = StringIO.new(download)
    reader = PDF::Reader.new(io)
    reader.pages.map(&:text).join("\n")
  end
end
