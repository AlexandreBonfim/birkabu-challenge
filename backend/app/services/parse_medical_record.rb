class ParseMedicalRecord
  Result = Struct.new(:structured_data, :language, keyword_init: true)

  def initialize(text)
    @text = text.to_s
  end

  def call
    Result.new(
      structured_data: {
        raw_preview: @text[0..200]
      },
      language: detect_language
    ).to_h
  end

  private

  def detect_language
    # naive expectation: treat Spanish articles/pronouns as signal for "es", otherwise default to English
    spanish_markers = /\b(el|la|los|las|un|una|unos|unas|de|y|que)\b/i
    @text.match?(spanish_markers) ? "es" : "en"
  end
end
