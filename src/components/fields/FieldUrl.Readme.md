# FieldUrl

`FieldUrl` is a smart and accessible input for entering URLs.

It supports protocol completion (`https://`), warns about insecure links (`http://`), and offers convenience actions like previewing and copying the URL.

---

## ✨ Features

- Auto-prefixes with `https://` on blur (if no protocol is provided)
- Shows warning icon for `http://` links
- Includes open-in-new-tab and copy buttons
- Fully keyboard-accessible and screen reader-friendly
- Supports all standard field props: `disabled`, `autoFocus`, `aria-*`, `suffix`, etc.

---

## 🔪 Usage

```tsx
<FieldUrl
  value="https://example.com"
  onChange={(newValue) => ...}
  schema={{ type: 'core/url', label: 'Website' }}
  name="url"
  placeholder="https://example.com"
  autoFocus
/>
```

---

## 📋 Props

All props from `FieldRendererProps` plus:

| Prop               | Type            | Description                             |
|--------------------|------------------|-----------------------------------------|
| `placeholder`      | `string`         | Placeholder text                        |
| `suffix`           | `ReactNode`      | Override the default action buttons     |
| `prefix`           | `ReactNode`      | Override the default URL icon           |
| `autoFocus`        | `boolean`        | Automatically focus on mount            |
| `aria-label`       | `string`         | Accessibility label                     |
| `aria-describedby` | `string`         | For linking to descriptive text         |
| `className`        | `string`         | Custom CSS class                        |
| `style`            | `CSSProperties`  | Custom inline styles                    |
| `data-testid`      | `string`         | For testing purposes                    |

---

## 🚦 Behavior

| User Input         | Result                                   |
|--------------------|------------------------------------------|
| `example.com`      | Auto-converted to `https://example.com`  |
| `http://foo.com`   | Allowed, with a subtle ⚠️ warning icon  |
| `https://bar.com`  | Fully valid, opens via icon              |

---

## 💡 Notes

- You can override `suffix` if you want to disable or change the default buttons.
- The copy icon gives a temporary “Copied!” tooltip.
- The open-in-new-tab icon appears only for valid `https?://` links.

