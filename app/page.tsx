import TablePage from "./components/table/page";
import { Row, Col } from 'antd';

const Home = () => {
  return (
    <main>
      <Row justify="center">
        <Col span={20}>
          <h1 className="mt-12 mb-12">Supabase Product Table</h1>
          <TablePage />
        </Col>
      </Row>
    </main>
  );
}

export default Home;
