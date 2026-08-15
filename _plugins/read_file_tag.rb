module Jekyll
  class ReadFileTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @path = text.strip
    end

    def render(context)
      site = context.registers[:site]
      full_path = File.join(site.source, @path)
      File.read(full_path)
    end
  end
end

Liquid::Template.register_tag("read_file", Jekyll::ReadFileTag)
