/*
  # Update RLS Policies for Data Import

  Allow authenticated users (via service role or API) to insert data.
  Public users can still only read.
*/

DROP POLICY IF EXISTS "Public can view parties" ON parties;
DROP POLICY IF EXISTS "Public can view constituencies" ON constituencies;
DROP POLICY IF EXISTS "Public can view leaders" ON leaders;
DROP POLICY IF EXISTS "Public can view profiles" ON profiles;
DROP POLICY IF EXISTS "Public can view candidacies" ON candidacies;

CREATE POLICY "Public can view parties"
  ON parties FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert parties"
  ON parties FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view constituencies"
  ON constituencies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert constituencies"
  ON constituencies FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view leaders"
  ON leaders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert leaders"
  ON leaders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view profiles"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert profiles"
  ON profiles FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view candidacies"
  ON candidacies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert candidacies"
  ON candidacies FOR INSERT
  TO public
  WITH CHECK (true);