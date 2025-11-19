# 🚀 دليل النشر على Cloudflare Pages

## خطوات النشر

### الطريقة 1: النشر عبر Dashboard (موصى به للمبتدئين)

1. **إنشاء حساب Cloudflare (إذا لم يكن لديك)**
   - اذهب إلى: https://dash.cloudflare.com/sign-up
   - أنشئ حساب مجاني

2. **الانتقال إلى Cloudflare Pages**
   - سجل الدخول إلى: https://dash.cloudflare.com
   - اضغط على **Workers & Pages** من القائمة الجانبية
   - اضغط على **Create application**
   - اختر **Pages** ثم **Connect to Git**

3. **ربط المستودع من GitHub**
   - اختر **GitHub** كمصدر
   - امنح Cloudflare صلاحية الوصول إلى المستودع
   - اختر المستودع: `ali20225/mrshd2`
   - اضغط **Begin setup**

4. **إعدادات البناء**
   ```
   Project name: murshedak-almahani (أو أي اسم تريده)
   Production branch: main
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   ```

5. **إضافة متغيرات البيئة (Environment Variables)**
   - في صفحة الإعدادات، اضغط على **Environment variables**
   - لا حاجة لإضافة متغيرات الآن، يمكن إضافتها لاحقاً إذا لزم الأمر

6. **إنشاء قاعدة البيانات D1**
   - اذهب إلى **Storage & Databases** > **D1**
   - اضغط **Create database**
   - اسم قاعدة البيانات: `webapp-production`
   - اضغط **Create**
   - **انسخ Database ID** واحفظه

7. **ربط قاعدة البيانات بالمشروع**
   - ارجع إلى مشروع Pages الخاص بك
   - اذهب إلى **Settings** > **Functions**
   - في قسم **D1 database bindings**:
     - Variable name: `DB`
     - D1 database: اختر `webapp-production`
   - احفظ التغييرات

8. **تطبيق Migrations على قاعدة البيانات**
   - ستحتاج إلى استخدام Wrangler CLI محلياً:
   ```bash
   npx wrangler login
   npx wrangler d1 migrations apply webapp-production
   ```

9. **البدء في النشر**
   - اضغط **Save and Deploy**
   - انتظر حتى يكتمل البناء (2-3 دقائق)
   
10. **الحصول على الرابط المباشر**
    - بعد اكتمال النشر، ستحصل على رابط مثل:
    - `https://murshedak-almahani.pages.dev`
    - يمكنك أيضاً إضافة دومين مخصص من الإعدادات

---

### الطريقة 2: النشر عبر Wrangler CLI

إذا كنت تفضل استخدام سطر الأوامر:

```bash
# 1. تسجيل الدخول
npx wrangler login

# 2. إنشاء قاعدة البيانات
npx wrangler d1 create webapp-production

# 3. تحديث wrangler.jsonc بـ database_id الذي حصلت عليه

# 4. تطبيق Migrations
npx wrangler d1 migrations apply webapp-production

# 5. إنشاء مشروع Pages
npx wrangler pages project create murshedak-almahani

# 6. النشر
npm run deploy
```

---

### الطريقة 3: النشر التلقائي عبر GitHub Actions (متقدم)

تم إضافة ملف `.github/workflows/deploy.yml` للنشر التلقائي.

**الخطوات المطلوبة:**

1. **الحصول على Cloudflare API Token**
   - اذهب إلى: https://dash.cloudflare.com/profile/api-tokens
   - اضغط **Create Token**
   - اختر **Edit Cloudflare Workers** template
   - أو أنشئ token مخصص بصلاحيات:
     - Account > Cloudflare Pages > Edit
   - انسخ الـ Token

2. **الحصول على Account ID**
   - اذهب إلى: https://dash.cloudflare.com
   - من الصفحة الرئيسية، ستجد Account ID في الشريط الجانبي

3. **إضافة Secrets إلى GitHub**
   - اذهب إلى: https://github.com/ali20225/mrshd2/settings/secrets/actions
   - أضف Secret جديد:
     - Name: `CLOUDFLARE_API_TOKEN`
     - Value: الصق API Token الذي حصلت عليه
   - أضف Secret آخر:
     - Name: `CLOUDFLARE_ACCOUNT_ID`
     - Value: الصق Account ID

4. **Push التغييرات**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

5. **متابعة النشر**
   - اذهب إلى: https://github.com/ali20225/mrshd2/actions
   - ستشاهد workflow يعمل تلقائياً
   - بعد النجاح، سيكون الموقع متاح على Cloudflare Pages

---

## 🔗 الروابط المهمة

- **مستودع GitHub**: https://github.com/ali20225/mrshd2
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **الرابط المتوقع بعد النشر**: https://murshedak-almahani.pages.dev

---

## 📝 ملاحظات

1. **قاعدة البيانات D1**:
   - يجب إنشاء قاعدة البيانات وتطبيق migrations قبل أول استخدام
   - قاعدة البيانات مجانية حتى 5GB

2. **الدومين المخصص**:
   - يمكنك إضافة دومين مخصص من إعدادات المشروع
   - الدومين المجاني `.pages.dev` يعمل بشكل ممتاز

3. **التحديثات التلقائية**:
   - بعد إعداد GitHub Actions، أي push لـ main branch سيُنشر تلقائياً

4. **الأداء**:
   - Cloudflare Pages يوفر CDN عالمي مجاني
   - الموقع سيكون سريع جداً في جميع أنحاء العالم

---

## ❓ الدعم

إذا واجهت أي مشاكل:
1. راجع [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
2. راجع [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler)
3. افتح Issue في المستودع

---

**صُنع بـ ❤️ للإرشاد المهني التفاعلي**
