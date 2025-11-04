// ✅ src/tests/test-utils.tsx
import React, { type ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import * as rtl from "@testing-library/react"; // 👈 this lets us re-export everything
import { CartProvider } from "../context/CartContext";

// 🔹 Wrap tests with all required providers
function ProviderWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

// 🔹 Custom render method (automatically includes providers)
function render(ui: React.ReactElement) {
  return rtlRender(ui, { wrapper: ProviderWrapper });
}

// 🔹 Re-export everything from @testing-library/react (includes `screen`, `fireEvent`, etc.)
export * from "@testing-library/react";

// 🔹 Override default render with our wrapped version
export { render };
