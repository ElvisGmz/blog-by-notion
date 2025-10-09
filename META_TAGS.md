# OpenGraph and Twitter Card Meta Tags

This blog now includes comprehensive meta tags for better social media sharing previews.

## How it works

When you share a blog post URL on social media platforms (Facebook, Twitter, LinkedIn, etc.), these platforms will display a rich preview card with:

- **Title**: The blog post title from Notion
- **Description**: The blog post description from Notion
- **Image**: The cover image from Notion
- **URL**: The full URL to the blog post

## Meta Tags Included

### OpenGraph Tags (Facebook, LinkedIn, etc.)
- `og:type`: article
- `og:title`: Blog post title
- `og:description`: Blog post description
- `og:image`: Blog post cover image
- `og:url`: Full URL to the blog post

### Twitter Card Tags
- `twitter:card`: summary_large_image
- `twitter:title`: Blog post title
- `twitter:description`: Blog post description
- `twitter:image`: Blog post cover image

## Testing

To test the meta tags, you can use:

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Simply paste your blog post URL into these tools to see how the preview will appear.

## Example

For a blog post at `https://yourdomain.com/abc123`, the rendered HTML head will include:

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="Your Blog Post Title" />
<meta property="og:description" content="Your blog post description" />
<meta property="og:image" content="https://notion-cover-image-url.jpg" />
<meta property="og:url" content="https://yourdomain.com/abc123" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Blog Post Title" />
<meta name="twitter:description" content="Your blog post description" />
<meta name="twitter:image" content="https://notion-cover-image-url.jpg" />
```

## Requirements

The meta tags are automatically generated from your Notion page properties:
- **Name** property → Used for title
- **description** property → Used for description
- **Cover image** → Used for preview image

Make sure these properties are set in your Notion pages for optimal sharing previews.
