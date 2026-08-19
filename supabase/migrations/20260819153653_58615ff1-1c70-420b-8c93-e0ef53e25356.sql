CREATE EXTENSION IF NOT EXISTS pg_graphql;
GRANT USAGE ON SCHEMA graphql TO anon, authenticated, service_role;
GRANT ALL ON FUNCTION graphql.resolve TO anon, authenticated, service_role;